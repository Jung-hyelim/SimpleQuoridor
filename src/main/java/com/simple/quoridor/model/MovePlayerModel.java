package com.simple.quoridor.model;

import java.util.List;

import lombok.Data;

@Data
public class MovePlayerModel {
	private Integer resultStatus;	// 결과 상태[0(이동불가능)/1(이동가능)/2(게임끝)] 
	private String resultReason;	// 이동 불가능 이유
	private List<Integer> map;		// 맵
	private String nextPlayer;		// 다음 차례
}
