package com.example.demo.repository

import org.springframework.data.mongodb.repository.MongoRepository

interface ItemRepository : MongoRepository<ItemEntity, String> {
    override fun findAll(): MutableList<ItemEntity>
    fun save(item: ItemEntity) : ItemEntity
    override fun deleteById(id: String)
}