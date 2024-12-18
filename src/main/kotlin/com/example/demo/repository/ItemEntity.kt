package com.example.demo.repository

import lombok.Builder
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "TIL")
@Builder
data class ItemEntity(
    @Id
    val id: String = ObjectId.get().toString(),
    val text: String,
    val source: String,
    val category: String,
    val votesInteresting: String,
    val votesMindBlowing: String,
    val createdIn: String
)