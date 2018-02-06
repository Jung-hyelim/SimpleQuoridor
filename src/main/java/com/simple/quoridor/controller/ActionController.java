package com.simple.quoridor.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simple.quoridor.common.enums.ResultType;
import com.simple.quoridor.common.model.ApiResultInstall;
import com.simple.quoridor.common.model.ApiResultMove;
import com.simple.quoridor.model.CurrentInfo;
import com.simple.quoridor.model.MovePlayerModel;
import com.simple.quoridor.service.ActionService;

@Api(description = "Action Controller API")
@RestController
@RequestMapping("/games/{gameName}/{version}")
public class ActionController {
	
	private CurrentInfo info = new CurrentInfo();
	
	@Resource(name="actionService")
	private ActionService actionService;

	@ApiOperation(value = "install wall", notes = "벽 설치")
	@RequestMapping(value = "/install", method = RequestMethod.POST)
	public ApiResultInstall installWall(@RequestBody int[] xy) {

		//InstallWallModel result = null;
		Integer[][] map = info.getMap();	// 현재 맵 정보
		
		int x1 = xy[0];
		int y1 = xy[1];
		int x2 = xy[2];
		int y2 = xy[3];
		int x3 = xy[4];
		int y3 = xy[5];
		
		// 선택한 위치가 벽 위치인지 판단
		if (!actionService.isWallLocation(map, x1, y1, x2, y2, x3, y3)) {
			//result = new InstallWallModel(0, ResultType.NOT_INSTALL_THAT_LOCATION.getMessage(), map, "nextPlayer");
			return new ApiResultInstall(true, ResultType.NOT_INSTALL_THAT_LOCATION.getCode(), ResultType.NOT_INSTALL_THAT_LOCATION.getMessage());
		}
		
		// 선택한 위치에 벽이 이미 설치되어있는지 판단
		if (actionService.isAlreadyInstalled(map, x1, y1, x2, y2, x3, y3)) {
			//result = new InstallWallModel(0, ResultType.NOT_INSTALL_HAS_WALL.getMessage(), map, "nextPlayer");
			return new ApiResultInstall(true, ResultType.NOT_INSTALL_HAS_WALL.getCode(), ResultType.NOT_INSTALL_HAS_WALL.getMessage());
		}
		
		// 선택한 위치에 벽을 설치하면 길이 막히는지 아닌지 판단
		if (actionService.isBlocking(map, x1, y1, x2, y2, x3, y3)) {
			//result = new InstallWallModel(0, ResultType.NOT_INSTALL_BLOKING.getMessage(), map, "nextPlayer");
			return new ApiResultInstall(true, ResultType.NOT_INSTALL_BLOKING.getCode(), ResultType.NOT_INSTALL_BLOKING.getMessage());
		}
		
		// 성공 - 벽 설치 가능
		//result = new InstallWallModel(1, "", map, "nextPlayer");
		info.switchPlayer();
		info.updateMap(x1, y1, 1);
		info.updateMap(x2, y2, 1);
		info.updateMap(x3, y3, 1);
		return new ApiResultInstall(true, ResultType.OK.getCode(), ResultType.OK.getMessage());
	}

	
	@ApiOperation(value = "move player", notes = "말 이동")
	@RequestMapping(value = "/move", method = RequestMethod.POST)
	public ApiResultMove movePlayer(@RequestBody int[] map) {
		
		MovePlayerModel result = null;

		// 선택한 위치가 말 위치인지 판단
		
		// 벽으로 막혀서 이동 불가능한지 판단
		
		// 상대방 말이 놓여있어서 이동 불가능한지 판단
		
		// 상대편 말을 점프뛰는지 판단
		
		// 도착지에 도착했는지 판단 - 게임끝

		// 도착안했으면 게임 진행
		
		return new ApiResultMove(true, 200, "", result);
	}
	
}
