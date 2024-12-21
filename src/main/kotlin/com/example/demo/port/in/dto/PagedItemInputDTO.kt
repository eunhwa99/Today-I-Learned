package com.example.demo.port.`in`.dto

import com.example.demo.domain.TILItem

data class PagedItemInputDTO(
    val totalPages: Int,
    val itemList: List<TILItem>
)
