package com.example.demo.`port-out`

import com.example.demo.domain.TILItem
import com.example.demo.repository.ItemEntity
import com.example.demo.repository.ItemRepository
import com.mongodb.client.result.UpdateResult
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.stereotype.Component

@Component
class ItemRepositoryInterface(private val itemRepository: ItemRepository, private val mongoTemplate: MongoTemplate) {

    fun saveItem(item: TILItem): TILItem {
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
        return TILItem(it.id, it.text, it.source, it.category, it.votesInteresting, it.votesMindBlowing, it.createdIn)
    }

    fun getAllItem(): List<TILItem> {
        val itemList = itemRepository.findAll()
        return itemList.asSequence()
            .map {
                TILItem(
                    it.id,
                    it.text,
                    it.source,
                    it.category,
                    it.votesInteresting,
                    it.votesMindBlowing,
                    it.createdIn
                )
            }
            .toList()

    }

    fun getItem(id: String): TILItem? {
        return itemRepository.findById(id)
            .map { it ->  // Optional 값이 존재하면 map을 사용하여 변환
                TILItem(it.id, it.text, it.source, it.category, it.votesInteresting, it.votesMindBlowing, it.createdIn)
            }
            .orElse(null)  // 값이 없으면 null 반환
    }

    fun updateItem(id: String, attributes: Map<String, String>): UpdateResult {
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


    fun deleteItem(id: String) {
        itemRepository.deleteById(id);
    }
}