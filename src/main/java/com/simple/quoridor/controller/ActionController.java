package com.simple.quoridor.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simple.quoridor.model.ResponseJson;

@Api(value = "ActionController", description = "Action Controller API")
@RestController
@RequestMapping("/games/{gameName}/{version}/user/{player}")
public class ActionController {

	@ApiOperation(value = "install wall", notes = "벽 설치")
	@RequestMapping(value = "/install", method = RequestMethod.GET, produces = "application/json")
	public ResponseJson installWall(@RequestParam(value = "map", required = true) List<String> map) {

		boolean result = false;
		String reason = "null";
		
		// TODO : hyelim-jung : 깊이우선탐색 or 너비우선탐색으로 벽 설치가 가능한지 판단
		
		return new ResponseJson(result, reason);
	}

	
	@ApiOperation(value = "move player", notes = "말 이동")
	@RequestMapping(value = "/move", method = RequestMethod.GET, produces = "application/json")
	public ResponseJson movePlayer(@RequestParam(value = "map", required = true) List<String> map) {

		boolean result = false;
		String reason = "null";
		
		// TODO : hyelim-jung : 말을 이동할 수 있는지 판단
		
		return new ResponseJson(result, reason);
	}
	
}
