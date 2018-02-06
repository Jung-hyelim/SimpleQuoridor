package com.simple.quoridor.service.impl;

import org.springframework.stereotype.Service;

import com.simple.quoridor.service.ActionService;

@Service("actionService")
public class ActionServiceImpl implements ActionService {

	@Override
	public boolean isWallLocation(Integer[][] map, int x1, int y1, int x2, int y2, int x3, int y3) {
		// TODO Auto-generated method stub
		return false;
	}
	
	@Override
	public boolean isAlreadyInstalled(Integer[][] map, int x1, int y1, int x2, int y2, int x3, int y3) {
		// TODO Auto-generated method stub
		return false;
	}
	
	@Override
	public boolean isBlocking(Integer[][] map, int x1, int y1, int x2, int y2, int x3, int y3) {
		// TODO Auto-generated method stub
		return false;
	}
	
	@Override
	public boolean isPlayerLocation(Integer[][] map, int x1, int y1, int x2, int y2, int x3, int y3) {
		// TODO Auto-generated method stub
		return false;
	}
}
