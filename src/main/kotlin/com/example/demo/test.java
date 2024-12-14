package com.example.demo;

public class test {
    public boolean isPalindrome(String s) {

        String s2 = s.toLowerCase().trim();

        int len = s2.length();
        for(int i=0;i<len;i++){
            if(s.charAt(i)!=s2.charAt(len-i-1)) return false;
        }
        return true;
    }
}
