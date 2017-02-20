package com.simple.quoridor.controller;

import io.swagger.annotations.Api;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import springfox.documentation.spring.web.json.Json;

@Api(description = "Install Wall Controller API - º® ¼³Ä¡")
@RestController
public class InstallWallController {

	@RequestMapping(value = "/games/{gameName}/{version}/install/wall", method = RequestMethod.GET, produces = "application/json")
	public String isPossibleInstall(@PathVariable String version) {

		return "";
	}
}
