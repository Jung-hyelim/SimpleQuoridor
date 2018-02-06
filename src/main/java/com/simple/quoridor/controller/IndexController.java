package com.simple.quoridor.controller;

import io.swagger.annotations.Api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.simple.quoridor.model.CurrentInfo;

@Api(description = "IndexController API")
@RestController
public class IndexController {
	
	CurrentInfo info;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView("/index");

        return mav;
    }


    @RequestMapping(value = "/start", method = RequestMethod.GET)
    public ModelAndView gameStart() {
        ModelAndView mav = new ModelAndView("/game");
        
        // game 초기 셋팅
        this.info = new CurrentInfo();
        //System.out.println(info.getMap());

        return mav;
    }

}
