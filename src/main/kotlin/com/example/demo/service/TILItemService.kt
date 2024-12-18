package com.example.demo.service

import com.example.demo.domain.TILItem
import com.example.demo.`port-out`.ItemRepositoryInterface
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

    fun updateItem(id: String, attributes: Map<String, String>){
       itemRepository.updateItem(id, attributes)
        logger.info("Update item with id: $id -> ${getItem(id)}")
    }

    fun deleteItem(id: String) {
        val item = getItem(id) ?: return  // 아이템이 없으면 삭제를 진행하지 않음
        itemRepository.deleteItem(id)
        logger.info("Deleted item with id: $id -> $item")
    }

}