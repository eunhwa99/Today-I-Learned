package com.example.demo.controller

import com.example.demo.Service
import com.example.demo.domain.TILItem
import com.example.demo.service.TILItemService
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
class RequestController(private val itemService: TILItemService, private val service: Service) {
    private val logger: Logger = LoggerFactory.getLogger(RequestController::class.java)

    @GetMapping("/item-list")
    fun getItemList(): List<TILItem> {
        logger.info("Get items")
        return itemService.getAllItems()
    }

    @PostMapping("/item")
    fun createItem(@RequestBody item: TILItem): TILItem {
        logger.info("Create an item: ${item}")
        return itemService.createItem(item)
    }

    @PatchMapping("/item")
    fun updateItemVotes(@RequestParam id: String, @RequestBody attributes: Map<String, String>){
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