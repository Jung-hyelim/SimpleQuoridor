package com.simple.quoridor.controller;

import io.swagger.annotations.Api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(description = "Move User Controller API - ∏ª ¿Ãµø")
@RestController
public class MoveUserController {

	@RequestMapping(value = "/games/{gameName}/{version}/move/{user}", method = RequestMethod.GET)
	public String isPossibleMove(@RequestParam String user) {
		
		return "";
	}
}
