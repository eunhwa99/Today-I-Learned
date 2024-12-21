package com.example.demo.adapter.out.repository

import com.example.demo.adapter.out.entity.ItemEntity
import com.example.demo.application.service.TILItemService
import com.example.demo.domain.TILItem
import com.example.demo.domain.TILItemFactory
import com.example.demo.port.out.dto.ItemListOutputDTO
import com.example.demo.port.out.repository.ItemRepositoryInterface
import com.example.demo.port.out.dto.PagedItemOutputDTO
import com.mongodb.client.result.UpdateResult
import lombok.extern.slf4j.Slf4j
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.SliceImpl
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.stereotype.Component

@Component
@Slf4j
class ItemRepositoryMongoAdapter(private val itemRepository: ItemRepository, private val mongoTemplate: MongoTemplate) :
    ItemRepositoryInterface {
    override fun saveItem(item: TILItem): TILItem {
        val it = itemRepository.save(
            ItemEntity(
                text = item.text,
                source = item.source,
                category = item.category,
                votesInteresting = item.votesInteresting,
                votesMindBlowing = item.votesMindBlowing,
                createdIn = item.createdIn
            )
        )
        return TILItemFactory.from(it)
    }

    private val logger: Logger = LoggerFactory.getLogger(ItemRepositoryInterface::class.java)

    override fun loadInitialItems(pageable: Pageable): PagedItemOutputDTO {
        val page: Page<ItemEntity> = itemRepository.findAll(pageable)
        return PagedItemOutputDTO(
            totalPages = page.totalPages,
            itemList = page.content
        )
    }

    override fun loadInitialItemsByCategory(cat: String, pageable: Pageable): PagedItemOutputDTO {
        val page: Page<ItemEntity> = itemRepository.findByCategory(cat, pageable)
        return PagedItemOutputDTO(
            totalPages = page.totalPages,
            itemList = page.content
        )
    }

    override fun loadNextItems(pageable: Pageable): ItemListOutputDTO {
        val query = Query().with(pageable)
        val items = mongoTemplate.find(query, ItemEntity::class.java) // 해당 페이지의 데이터만 가져옴

        val totalElements = mongoTemplate.count(query, ItemEntity::class.java)
        logger.info("LoadNextItems: total - ${totalElements}")

        return ItemListOutputDTO(items.toList())
    }

    override fun loadNextItemsByCategory(cat: String, pageable: Pageable): ItemListOutputDTO {
        val query = Query(Criteria.where("category").`is`(cat)).with(pageable)
        val items = mongoTemplate.find(query, ItemEntity::class.java)
        // 총 아이템 개수 (페이징을 위해 전체 아이템 개수도 계산)
        val totalElements = mongoTemplate.count(query, ItemEntity::class.java)
        logger.info("LoadNextItemsByCategory: total - ${totalElements}")
        return ItemListOutputDTO(items.toList())

    }

    override fun findItem(id: String): TILItem? {
        return itemRepository.findById(id)
            .map {   // Optional 값이 존재하면 map을 사용하여 변환
                TILItemFactory.from(it)
            }
            .orElse(null)  // 값이 없으면 null 반환
    }

    override fun updateItem(id: String, attributes: Map<String, String>): UpdateResult {
        // 아이템을 찾는 조건을 설정 (ID로 찾기)
        val query = Query(Criteria.where("_id").`is`(id))

        val update = Update()
        attributes.forEach { (key, value) ->
            update.set(key, value) // attributes의 각 key-value로 업데이트 필드 설정
        }

        // MongoDB에서 해당 아이템을 업데이트
        val result = mongoTemplate.updateFirst(query, update, ItemEntity::class.java)

        return result
    }


    override fun deleteItem(id: String) {
        itemRepository.deleteById(id);
    }
}