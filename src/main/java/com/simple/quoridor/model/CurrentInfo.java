package com.simple.quoridor.model;

import lombok.Data;

@Data
public class CurrentInfo {
	private String currentPlayer;	// 현재 player
	private Integer[][] map = new Integer[17][17];	// 현재 map
	
	public CurrentInfo() {
		this.currentPlayer = "p1";
		for(int i = 0; i < this.map.length; i++) {
			for(int j = 0; j < this.map[i].length; j++) {
				if(i%2 == 0 && j%2 == 0) {
					this.map[i][j] = 0;
				}else {
					this.map[i][j] = 1;
				}
			}
		}
	}
	 
	/**
	 * 현재 player 변경
	 */
	public void switchPlayer() {
		if(this.currentPlayer.equals("p1")) {
			this.currentPlayer = "p2";
		}else if(this.currentPlayer.equals("p2")) {
			this.currentPlayer = "p1";
		}
	}
	
	/**
	 * map 정보 업데이트
	 * @param x
	 * @param y
	 * @param status
	 */
	public void updateMap(Integer x, Integer y, Integer status) {
		this.map[x][y] = status;
	}
	
	/**
	 * map정보를 출력
	 * @return
	 */
	public String getMapString() {
		String strMap = "";
		for(int i = 0; i < map.length; i++) {
			for(int j = 0; j < map[i].length; j++) {
				strMap += map[i][j] + " ";
			}
			strMap += "\n";
		}
		return strMap;
	}
}
