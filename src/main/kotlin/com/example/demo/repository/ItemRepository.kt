package com.example.demo.repository

import org.springframework.data.mongodb.repository.MongoRepository
import java.util.*

interface ItemRepository : MongoRepository<ItemEntity, String> {
    override fun findAll(): MutableList<ItemEntity>
    fun save(item: ItemEntity) : ItemEntity
    override fun findById(id: String): Optional<ItemEntity>
    override fun deleteById(id: String)
}