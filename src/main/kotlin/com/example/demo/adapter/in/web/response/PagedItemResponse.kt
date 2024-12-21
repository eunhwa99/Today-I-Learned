package com.example.demo.adapter.`in`.web.response

import com.example.demo.domain.TILItem

data class PagedItemResponse(val items: List<TILItem>, val totalCount: Long)