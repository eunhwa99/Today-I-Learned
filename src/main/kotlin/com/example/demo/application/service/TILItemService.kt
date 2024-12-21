package com.example.demo.application.service

import com.example.demo.adapter.out.entity.ItemEntity
import com.example.demo.domain.TILItem
import com.example.demo.domain.TILItemFactory
import com.example.demo.port.`in`.dto.PagedItemInputDTO
import com.example.demo.port.out.repository.ItemRepositoryInterface
import com.mongodb.client.result.UpdateResult
import lombok.extern.slf4j.Slf4j
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Slf4j
@Service
class TILItemService(private val itemRepository: ItemRepositoryInterface) {
    private val logger: Logger = LoggerFactory.getLogger(TILItemService::class.java)
    fun createItem(item: TILItem): TILItem {
        return itemRepository.saveItem(item)
    }


    fun getAllItems(page: Int, size: Int, totalPage: Int): PagedItemInputDTO {
        return if (totalPage == 0) {
            // 초기화 요청일 때
            loadInitialItems(page, size)
        } else {
            // 이후 요청일 때
            loadNextItems(page, size, totalPage)
        }
    }

    private fun loadInitialItems(page: Int, size: Int): PagedItemInputDTO {
        val items = itemRepository.loadInitialItems(PageRequest.of(page, size))
        return PagedItemInputDTO(items.totalPages, convert(items.itemList))
    }

    private fun loadNextItems(page: Int, size: Int, totalPage: Int): PagedItemInputDTO {
        val items = itemRepository.loadNextItems(PageRequest.of(page, size))
        return PagedItemInputDTO(totalPage, convert(items.itemList))
    }

    private fun convert(itemList: List<ItemEntity>): List<TILItem> {
        return itemList.map { item -> TILItemFactory.from(item) }
    }


    fun getItemsByCategory(page: Int, size: Int, totalPage: Int, category: String): PagedItemInputDTO {
        if (category == "all")
            return getAllItems(page, size, totalPage)

        val pageable: Pageable = PageRequest.of(page, size)
        return if (totalPage == 0) {
            // 초기화 요청일 때
            loadInitialItemsByCategory(pageable, category)
        } else {
            // 이후 요청일 때
            loadNextItemsByCategory(pageable, category, totalPage)
        }
    }

    private fun loadInitialItemsByCategory(pageable: Pageable, category: String): PagedItemInputDTO {
        val items = itemRepository.loadInitialItemsByCategory(category, pageable)
        return PagedItemInputDTO(items.totalPages, convert(items.itemList))
    }

    private fun loadNextItemsByCategory(pageable: Pageable, category: String, totalPage: Int): PagedItemInputDTO {
        val items = itemRepository.loadNextItemsByCategory(category, pageable)
        return PagedItemInputDTO(totalPage, convert(items.itemList))
    }

    fun getItem(id: String): TILItem? {
        val item = itemRepository.findItem(id)
        if (item == null) {
            logger.info("No item found with id: $id")
        } else {
            logger.info("Fetched item with id: $id -> $item")
        }
        return item
    }

    fun updateItem(id: String, attributes: Map<String, String>): UpdateResult {
        return itemRepository.updateItem(id, attributes)
    }

    fun deleteItem(id: String): TILItem? {
        val item = getItem(id) ?: return null
        itemRepository.deleteItem(id)
        return item
    }

}