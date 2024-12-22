package com.example.demo.port.out.repository

import com.example.demo.domain.TILItem
import com.example.demo.port.out.dto.ItemListOutputDTO
import com.example.demo.port.out.dto.PagedItemOutputDTO
import com.mongodb.client.result.UpdateResult
import org.springframework.data.domain.Pageable


interface ItemRepositoryInterface {
    fun saveItem(item: TILItem): TILItem
    fun loadInitialItems(pageable: Pageable): PagedItemOutputDTO
    fun loadInitialItemsByCategory(cat: String, pageable: Pageable): PagedItemOutputDTO
    fun loadNextItems(pageable: Pageable): ItemListOutputDTO
    fun loadNextItemsByCategory(cat: String, pageable: Pageable): ItemListOutputDTO
    fun findItem(id: String): TILItem?
    fun updateItem(id: String, attributes: Map<String, String>): UpdateResult
    fun deleteItem(id: String)
    fun deleteAllItems()
}