package com.example.demo.`port-out`

import com.example.demo.domain.TILItem
import com.example.demo.repository.ItemEntity
import com.example.demo.repository.ItemRepository
import org.springframework.stereotype.Component

@Component
class ItemRepositoryInterface(private val itemRepository: ItemRepository) {
    fun saveItem(item: TILItem): TILItem{
        val it = itemRepository.save(ItemEntity(text=item.text, source=item.source, category = item.category, votesInteresting = item.votesInteresting, votesMindBlowing = item.votesMindBlowing, votesFalse = item.votesFalse, createdIn = item.createdIn))
        return TILItem(it.text, it.source, it.category, it.votesInteresting, it.votesMindBlowing, it.votesFalse, it.createdIn)
    }

    fun getAllItem(): List<TILItem> {
        val itemList = itemRepository.findAll()
        return itemList.asSequence()
            .map{TILItem(it.text, it.source, it.category, it.votesInteresting, it.votesMindBlowing, it.votesFalse, it.createdIn)}
            .toList()

    }
}