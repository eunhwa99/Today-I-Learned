package com.example.demo

import jakarta.servlet.DispatcherType
import jakarta.servlet.FilterChain
import jakarta.servlet.annotation.WebFilter
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import lombok.extern.slf4j.Slf4j
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@WebFilter(dispatcherTypes = [DispatcherType.REQUEST, DispatcherType.ASYNC], asyncSupported = true)
@Component
@Slf4j
class AsyncFilter: OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        logger.info("Filter executed. Dispatch type: + ${request.dispatcherType}, ${request.requestURI}, ${request.isAsyncStarted}")
        filterChain.doFilter(request, response)
    }

}