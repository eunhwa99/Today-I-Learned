package com.example.demo.controller

import com.example.demo.Service
import com.example.demo.domain.TILItem
import com.example.demo.service.TILItemService
import lombok.extern.slf4j.Slf4j
import org.slf4j.Logger
import org.slf4j.LoggerFactory
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
        logger.info("Get item")

        return itemService.getAllItem()
    }

    @PostMapping("/item")
    fun createItem(@RequestBody item: TILItem): TILItem {
        logger.info(item.toString())
        return itemService.createItem(item)
    }
}