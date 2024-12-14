package com.example.demo.controller

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestTemplate
import org.springframework.web.context.request.async.DeferredResult
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.util.concurrent.CompletableFuture
import java.util.concurrent.Executors
import java.util.function.Supplier


class RequestControllerTest{
    @Test
    fun testAsync() {
        val restTemplate = RestTemplate()
        val baseUrl = "http://localhost:8080/til/quotes "

        // ExecutorService를 사용하여 비동기 요청을 처리
        val executorService = Executors.newFixedThreadPool(10)
        val futures = mutableListOf<CompletableFuture<ResponseEntity<String>>>()

        try {
            val start = System.currentTimeMillis()

            // 10개의 비동기 요청을 보냄
            for (i in 1..10) {
                val future = CompletableFuture.supplyAsync({
                    restTemplate.getForEntity(baseUrl, String::class.java)
                }, executorService)

                futures.add(future)
            }

            println("Temp time: ${(System.currentTimeMillis() - start) / 1000} seconds")

            // 모든 비동기 요청이 끝날 때까지 기다림
            CompletableFuture.allOf(*futures.toTypedArray()).join()
            println("Total time: ${(System.currentTimeMillis() - start) / 1000} seconds")

        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
            executorService.shutdown()
        }
    }




    @Test
    fun test() {
        val restTemplate = RestTemplate()
        val baseUrl = "http://localhost:8080/til/async-future"

        // ExecutorService를 사용하여 비동기 요청을 처리
        val executorService = Executors.newFixedThreadPool(10)
        val futures = mutableListOf<CompletableFuture<ResponseEntity<Void>>>()

        try {
            val start = System.currentTimeMillis()

            // 10개의 비동기 요청을 보냄
            for (i in 1..10) {
                val future = CompletableFuture.supplyAsync({
                    restTemplate.getForEntity(baseUrl, Void::class.java)
                }, executorService)

                futures.add(future)
            }

            println("Temp time: ${(System.currentTimeMillis() - start) / 1000} seconds")

            // 모든 비동기 요청이 끝날 때까지 기다림
            CompletableFuture.allOf(*futures.toTypedArray()).join()
            println("Total time: ${(System.currentTimeMillis() - start) / 1000} seconds")

        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
            executorService.shutdown()
        }
    }
}