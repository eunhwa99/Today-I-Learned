package com.example.demo.adapter.`in`.web.controller

import com.example.demo.adapter.`in`.web.response.CreatedItemResponse
import com.example.demo.adapter.`in`.web.response.PagedItemResponse
import com.example.demo.application.service.TILItemService
import com.example.demo.domain.TILItem
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import lombok.extern.slf4j.Slf4j
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.scheduling.annotation.EnableAsync
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/til")
@Slf4j
@CrossOrigin(origins = ["http://localhost:3000"])
@EnableAsync
class RequestController(private val itemService: TILItemService) {
    private val logger: Logger = LoggerFactory.getLogger(RequestController::class.java)

    @GetMapping("/items")
    fun getPagedItemList(
        @RequestParam @Min(0) page: Int,
        @RequestParam @Min(1) size: Int,
        @RequestParam @Min(0) currentTotalCount: Long,
        @RequestParam category: String
    ): PagedItemResponse {
        logger.info("/items: ${currentTotalCount}")
        val data = itemService.getItemsByCategory(page, size, currentTotalCount, category)
        return PagedItemResponse(data.itemList, data.totalCount)
    }

    @PostMapping("/item")
    fun createItem(@RequestBody item: TILItem): CreatedItemResponse {
        logger.info("Create an item: ${item}")
        return CreatedItemResponse(itemService.createItem(item))
    }

    @PatchMapping("/item")
    fun updateItemVotes(@RequestParam id: String, @RequestBody attributes: Map<String, String>) {
        val result = itemService.updateItem(id, attributes)
        logger.info("Update attributes: ${attributes}, result: ${result}")

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)  // HTTP 204 No Content 상태 코드 반환
    @DeleteMapping("/item")
    fun deleteItem(@RequestParam id: String) {
        // 삭제 로직 수행
        val result = itemService.deleteItem(id)
        logger.info("Delete an item: ${result})")
    }

}