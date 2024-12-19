package com.example.demo.service

import com.example.demo.domain.TILItem
import com.example.demo.`port-out`.ItemRepositoryInterface
import com.mongodb.client.result.UpdateResult
import lombok.extern.slf4j.Slf4j
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Slf4j
@Service
class TILItemService(private val itemRepository: ItemRepositoryInterface) {
    private val logger: Logger = LoggerFactory.getLogger(TILItemService::class.java)
    fun createItem(item: TILItem): TILItem {
        return itemRepository.saveItem(item)
    }

    fun getAllItems(): List<TILItem> {
        return itemRepository.getAllItem()
    }

    fun getItem(id: String): TILItem? {
        val item = itemRepository.getItem(id)
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