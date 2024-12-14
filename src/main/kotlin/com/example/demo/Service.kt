package com.example.demo

import com.example.demo.controller.RequestController
import lombok.extern.slf4j.Slf4j
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Async
import org.springframework.scheduling.annotation.EnableAsync
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.lang.management.ManagementFactory
import java.util.concurrent.CompletableFuture
import java.util.concurrent.Future
import javax.management.MBeanServer
import javax.management.ObjectName

@Service
@EnableAsync
@Slf4j
class Service() {
    private val logger: Logger = LoggerFactory.getLogger(Service::class.java)

    @Async
    fun doService() {
        Thread.sleep(3000)
        logger.info("${Thread.currentThread().name} + Finish Async Task")
    }

    @Async
    fun asyncMethodUsingCompletableFuture(): CompletableFuture<String> {
        Thread.sleep(2000)  // Simulating some background task
        println("Processing the result: ${Thread.currentThread().name}")
        return CompletableFuture.completedFuture("Task with CompletableFuture completed")
    }

    @Async
    fun asyncMethodUsingFuture(): Future<String> {

        Thread.sleep(2000)  // Simulating some background task
        println("Processing the result: ${Thread.currentThread().name}")
        return CompletableFuture.completedFuture("Task with Future completed")
    }


}