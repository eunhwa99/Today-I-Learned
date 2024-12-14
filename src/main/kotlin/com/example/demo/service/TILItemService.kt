package com.example.demo.service

import com.example.demo.domain.TILItem
import com.example.demo.`port-out`.ItemRepositoryInterface
import org.springframework.stereotype.Service

@Service
class TILItemService (private val itemRepository: ItemRepositoryInterface){

    fun createItem(item: TILItem): TILItem{
        return itemRepository.saveItem(item)
    }

    fun getAllItem(): List<TILItem>{
        return itemRepository.getAllItem()
    }
}