package com.example.demo.port.`in`.dto

import com.example.demo.domain.TILItem

data class PagedItemInputDTO(
    val totalCount: Long,
    val itemList: List<TILItem>
)
