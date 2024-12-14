package com.example.demo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.ServletComponentScan

@SpringBootApplication
@ServletComponentScan
class TodayILearnedApplication

fun main(args: Array<String>) {
	runApplication<TodayILearnedApplication>(*args)
}
