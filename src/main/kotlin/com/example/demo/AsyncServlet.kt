package com.example.demo

import com.example.demo.controller.RequestController
import jakarta.servlet.ServletException
import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import lombok.extern.slf4j.Slf4j
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.io.IOException


@WebServlet(value = ["/async"], asyncSupported = true)
@Slf4j
class AsyncServlet : HttpServlet() {
    private val logger: Logger = LoggerFactory.getLogger(AsyncServlet::class.java)
    @Throws(ServletException::class, IOException::class)
    override fun doGet(req: HttpServletRequest, resp: HttpServletResponse) {
        val asyncContext = req.startAsync()
        logger.info("Async start ${Thread.currentThread().name}")
        req.setAttribute("value", Thread.currentThread().name)

        asyncContext.start {
            try {
                // 비동기 처리할 작업 (예: 외부 API 호출, DB 작업 등)
                Thread.sleep(5000)  // 예시: 외부 API 호출 대기
                logger.info("${Thread.currentThread().name} Finish ${req.getAttribute("value")}")

                // 비동기 작업 후 응답 처리
                asyncContext.complete()  //
            } catch (e: InterruptedException) {
                e.printStackTrace()
                asyncContext.complete()
            }
        }
    }
}
