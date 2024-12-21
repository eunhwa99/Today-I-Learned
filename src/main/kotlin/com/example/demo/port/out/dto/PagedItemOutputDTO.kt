package com.example.demo.port.out.dto

import com.example.demo.adapter.out.entity.ItemEntity

data class PagedItemOutputDTO(
    val totalPages: Int,
    val itemList: List<ItemEntity>
)