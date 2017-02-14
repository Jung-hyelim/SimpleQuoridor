package com.simple.quoridor.controller;

import com.simple.quoridor.model.ExampleModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView("/index");
        mav.addObject("projectName", "쿼리도");
        mav.addObject("projectMember", "정혜림 & 이상필");
        // for lombok test
        ExampleModel model = new ExampleModel();
        model.setId("jung hye lim");
        return mav;
    }

}
