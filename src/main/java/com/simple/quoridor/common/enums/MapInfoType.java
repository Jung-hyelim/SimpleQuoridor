package com.simple.quoridor.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MapInfoType {
	MAP0(0, "아무것도 없는 map"),
	MAP1(1, "아무것도 없는 wall"),
	MAP2(2, "wall 설치되어 있음"),
	MAP3(3, "player1 현재 위치"),
	MAP4(4, "player2 현재 위치")
	;
	
	private int code;
	private String info;
}
