package com.example.demo.domain

data class TILItem(
    val text: String,
    val source: String,
    val category: String,
    val votesInteresting: String,
    val votesMindBlowing: String,
    val votesFalse: Int,
    val createdIn: String
)