package com.simple.quoridor.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView("/index");

        return mav;
    }


    @RequestMapping(value = "/start", method = RequestMethod.GET)
    public ModelAndView gameStart() {
        ModelAndView mav = new ModelAndView("/game");

        return mav;
    }


}
