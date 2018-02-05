package com.simple.quoridor.service;



public interface ActionService {

	/**
	 * 선택한 위치가 벽 위치인지 판단
	 * @param 	map : 맵 정보
	 * @return 	true : 벽 위치,
	 * 			false : 벽 위치 아님(잘못된 위치)
	 */
	boolean isWallLocation(Integer[][] map, int x1, int y1, int x2, int y2, int x3, int y3);
	
	/**
	 * 선택한 위치에 벽이 이미 설치되어있는지 판단
	 * @param 	map : 맵정보
	 * @param 	x1
	 * @param 	y1
	 * @param 	x2
	 * @param 	y2
	 * @param 	x3
	 * @param 	y3
	 * @return	true : 벽 이미 설치되어 있음,
	 * 			false : 설치된 벽 없음
	 */
	boolean isAlreadyInstalled(Integer[][] map, int x1, int y1, int x2, int y2, int x3, int y3);	
	
	/**
	 * 선택한 위치에 벽을 설치하면 길이 막히는지 아닌지 판단 - 깊이우선탐색 방법 사용
	 * @param 	map : 맵정보
	 * @param 	x1
	 * @param 	y1
	 * @param 	x2
	 * @param 	y2
	 * @param 	x3
	 * @param 	y3
	 * @return	true : 길 막힘,
	 * 			false : 길 막히지 않음.
	 */
	boolean isBlocking(Integer[][] map, int x1, int y1, int x2, int y2, int x3, int y3);
	
	/**
	 * 선택한 위치가 말 위치인지 판단
	 * @param 	map : 맵 정보
	 * @param 	x1
	 * @param 	y1
	 * @param 	x2
	 * @param 	y2
	 * @param 	x3
	 * @param 	y3
	 * @return 	true : 말 위치,
	 * 			false : 말 위치 아님(잘못된 위치)
	 */
	boolean isPlayerLocation(Integer[][] map, int x1, int y1, int x2, int y2, int x3, int y3);
}
