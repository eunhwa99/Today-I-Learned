package com.example.demo.domain

import com.example.demo.adapter.out.entity.ItemEntity

data class TILItem(
    val id: String,
    val text: String,
    val source: String,
    val category: String,
    val votesInteresting: String,
    val votesMindBlowing: String,
    val userNote: String?,
    val createdIn: String
)

object TILItemFactory {
    fun from(itemEntity: ItemEntity): TILItem {
        return TILItem(
            id = itemEntity.id,
            text = itemEntity.text,
            source = itemEntity.source,
            category = itemEntity.category,
            votesInteresting = itemEntity.votesInteresting,
            votesMindBlowing = itemEntity.votesMindBlowing,
            userNote = itemEntity.userNote,
            createdIn = itemEntity.createdIn.toString()
        )
    }
}
