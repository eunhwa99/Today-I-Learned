package com.example.demo.port.out.dto

import com.example.demo.adapter.out.entity.ItemEntity

data class PagedItemOutputDTO(
    val totalCount: Long,
    val itemList: List<ItemEntity>
)