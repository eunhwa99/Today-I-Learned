package com.example.demo.domain

data class TILItem(
    val id: String,
    val text: String,
    val source: String,
    val category: String,
    val votesInteresting: String,
    val votesMindBlowing: String,
    val createdIn: String
)