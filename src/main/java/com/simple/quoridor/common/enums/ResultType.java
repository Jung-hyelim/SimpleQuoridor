package com.simple.quoridor.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ResultType {
	OK(2000, "성공"),
	NULL(4040, "NULL"),
	// INSTALL
	NOT_INSTALL_THAT_LOCATION(4030, "벽을 설치할 수 없는 위치임"),
	NOT_INSTALL_HAS_WALL(4031, "이미 벽이 설치되어있음"),
	NOT_INSTALL_BLOKING(4032, "길을 완전히 막을 수 없음"),
	// MOVE
	DENIDED_MOVE(4050, "움직일 수 없는 위치임"),
	DENIDED_MOVE_HAS_WALL(4051, "벽에 막혀 움직일 수 없음"),
	DENIDED_MOVE_HAS_PLAYER(4052, "상대방 말이 있어서 움직일 수 없음")
	;
	
	private Integer code;
	private String message;
}
