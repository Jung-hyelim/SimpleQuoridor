(function ($, window, document) {
    game.validate = game.validate || {};

    // 이동할 수 있는 위치인지 판단한다.
    game.validate.position = function(realX, realY) {
    	//game.util.loggingPosition(realX, realY);

        var arrayIndex = game.util.getArrayIndex(realX, realY);
        //console.log("1차원 배열값 :" + arrayIndex);

        realX = parseInt(realX);
        realY = parseInt(realY);

        var $maps = $('.map');
        
        if (game.common.currentAction == game.actionStatus.NONE) {
        	return false;
        	
        } else if (game.common.currentAction == game.actionStatus.CLICKPLAYER) {
            // 이동위치가 비어있는지 판단
        	if ($maps[arrayIndex].getAttribute("data-status") != game.mapStatus.ABLE_PLAYER) {
        		return false;
        	}
        	
        	// 내위치 에서 한번에 이동할 수 있는 거리인지 판단
            var beforeX = parseInt($maps[game.common.indexPlayer[game.common.currentPlayer-1]].getAttribute("data-row"));
            var beforeY = parseInt($maps[game.common.indexPlayer[game.common.currentPlayer-1]].getAttribute("data-col"));
            var checkLength = Math.abs(realX - beforeX) + Math.abs(realY - beforeY);
            var middleX = (beforeX + realX) / 2;
            var middleY = (beforeY + realY) / 2;
            var middleIndex = game.util.getArrayIndex(middleX, middleY);
            
            if (checkLength > 4 || checkLength <= 0) {
            	// 한번에 이동할 수 있는 거리가 아님
                return false;
            } else if (checkLength == 4) {
            	// 점프할 수 있는지 판단
            	
            	console.log("middle status:"+$maps[middleIndex].getAttribute("data-status"));
            	if (Math.abs(realX - beforeX) == 4) {
            		// 일직선 세로 점프
            		
            		// 점프 가운데에 플레이어가 있는지 판단
            		if ($maps[middleIndex].getAttribute("data-status") != game.mapStatus.PLAYER1
            		 && $maps[middleIndex].getAttribute("data-status") != game.mapStatus.PLAYER2) {
            			return false;
            		}
            		
            		// 점프 중간에 벽이 있는지 판단
            		if ($maps[game.util.getArrayIndex(middleX-1, middleY)].getAttribute("data-status") == game.mapStatus.WALL
            		 || $maps[game.util.getArrayIndex(middleX+1, middleY)].getAttribute("data-status") == game.mapStatus.WALL) {
            			return false;
            		}
            	} else if (Math.abs(realY - beforeY) == 4) {
            		// 일직선 가로 점프

            		// 점프 가운데에 플레이어가 있는지 판단
            		if ($maps[middleIndex].getAttribute("data-status") != game.mapStatus.PLAYER1
            		 && $maps[middleIndex].getAttribute("data-status") != game.mapStatus.PLAYER2) {
            			return false;
            		}
            		
            		// 점프 중간에 벽이 있는지 판단
            		if ($maps[game.util.getArrayIndex(middleX, middleY-1)].getAttribute("data-status") == game.mapStatus.WALL
            		 || $maps[game.util.getArrayIndex(middleX, middleY+1)].getAttribute("data-status") == game.mapStatus.WALL) {
            			return false;
            		}
            	} else {
            		// 대각선 점프

            		// 점프 가운데에 플레이어가 있는지 판단
            		if ($maps[game.util.getArrayIndex(realX, beforeY)].getAttribute("data-status") != game.mapStatus.PLAYER1
             	 	 && $maps[game.util.getArrayIndex(realX, beforeY)].getAttribute("data-status") != game.mapStatus.PLAYER2
              		 && $maps[game.util.getArrayIndex(beforeX, realY)].getAttribute("data-status") != game.mapStatus.PLAYER1
              	 	 && $maps[game.util.getArrayIndex(beforeX, realY)].getAttribute("data-status") != game.mapStatus.PLAYER2) {
            			return false;
            		}
            		
            		if ((realX - beforeX) > 0 && (realY - beforeY) > 0) {
            			// 오른쪽 아래로 이동.

            			// 사이에 플레이어가 있는지 확인
            			if ($maps[game.util.getArrayIndex(realX, beforeY)].getAttribute("data-status") == game.mapStatus.PLAYER1
            				|| $maps[game.util.getArrayIndex(realX, beforeY)].getAttribute("data-status") == game.mapStatus.PLAYER2 ) {
            			     
            				// 상대플레이어 오른쪽에 벽이 있어야 함.
            			    if ($maps[game.util.getArrayIndex(realX+1, beforeY)].getAttribute("data-status") != game.mapStatus.WALL) {
            			        return false;
            			    }
            			     
            			    // 상대플레이어 아래,왼쪽에 벽이 없어야 함.
            			    if ($maps[game.util.getArrayIndex(realX-1, beforeY)].getAttribute("data-status") == game.mapStatus.WALL
            			      || $maps[game.util.getArrayIndex(realX, beforeY+1)].getAttribute("data-status") == game.mapStatus.WALL) {
            			        return false;
            			    }

            			} else if ($maps[game.util.getArrayIndex(beforeX, realY)].getAttribute("data-status") == game.mapStatus.PLAYER1
            			 	|| $maps[game.util.getArrayIndex(beforeX, realY)].getAttribute("data-status") == game.mapStatus.PLAYER2) {
            			     
            				// 상대플레이어 아래에 벽이 있어야 함.
            			    if ($maps[game.util.getArrayIndex(beforeX, realY+1)].getAttribute("data-status") != game.mapStatus.WALL) {
            			        return false;
            			    }

            			    // 상대플레이어 위,오른쪽에 벽이 없어야 함.
            			    if ($maps[game.util.getArrayIndex(beforeX, realY-1)].getAttribute("data-status") == game.mapStatus.WALL
            			        || $maps[game.util.getArrayIndex(beforeX+1, realY)].getAttribute("data-status") == game.mapStatus.WALL) {
            			        return false;
            			    }

            			} else {
            			    // 사이에 플레이어가 없으므로 점프 불가능.
            			    return false;
            			}

            		} else if ((realX - beforeX) < 0 && (realY - beforeY) > 0) {
            			// 오른쪽 위로 이동.
            			
            			// 사이에 플레이어가 있는지 확인
            			if ($maps[game.util.getArrayIndex(realX, beforeY)].getAttribute("data-status") == game.mapStatus.PLAYER1
            				|| $maps[game.util.getArrayIndex(realX, beforeY)].getAttribute("data-status") == game.mapStatus.PLAYER2 ) {
            			     
            				// 상대플레이어 위쪽에 벽이 있어야 함.
            			    if ($maps[game.util.getArrayIndex(realX-1, beforeY)].getAttribute("data-status") != game.mapStatus.WALL) {
            			        return false;
            			    }
            			     
            			    // 상대플레이어 아래,오른쪽에 벽이 없어야 함.
            			    if ($maps[game.util.getArrayIndex(realX+1, beforeY)].getAttribute("data-status") == game.mapStatus.WALL
            			      || $maps[game.util.getArrayIndex(realX, beforeY+1)].getAttribute("data-status") == game.mapStatus.WALL) {
            			        return false;
            			    }

            			} else if ($maps[game.util.getArrayIndex(beforeX, realY)].getAttribute("data-status") == game.mapStatus.PLAYER1
            			 	|| $maps[game.util.getArrayIndex(beforeX, realY)].getAttribute("data-status") == game.mapStatus.PLAYER2) {
            			     
            				// 상대플레이어 오른쪽에 벽이 있어야 함.
            			    if ($maps[game.util.getArrayIndex(beforeX, realY+1)].getAttribute("data-status") != game.mapStatus.WALL) {
            			        return false;
            			    }

            			    // 상대플레이어 위,왼쪽에 벽이 없어야 함.
            			    if ($maps[game.util.getArrayIndex(beforeX, realY-1)].getAttribute("data-status") == game.mapStatus.WALL
            			        || $maps[game.util.getArrayIndex(beforeX-1, realY)].getAttribute("data-status") == game.mapStatus.WALL) {
            			        return false;
            			    }

            			} else {
            			    // 사이에 플레이어가 없으므로 점프 불가능.
            			    return false;
            			}

            		} else if ((realX - beforeX) > 0 && (realY - beforeY) < 0) {
            			// 왼쪽 아래로 이동.

            			// 사이에 플레이어가 있는지 확인
            			if ($maps[game.util.getArrayIndex(realX, beforeY)].getAttribute("data-status") == game.mapStatus.PLAYER1
            				|| $maps[game.util.getArrayIndex(realX, beforeY)].getAttribute("data-status") == game.mapStatus.PLAYER2 ) {
            			     
            				// 상대플레이어 아래쪽에 벽이 있어야 함.
            			    if ($maps[game.util.getArrayIndex(realX+1, beforeY)].getAttribute("data-status") != game.mapStatus.WALL) {
            			        return false;
            			    }
            			     
            			    // 상대플레이어 위,왼쪽에 벽이 없어야 함.
            			    if ($maps[game.util.getArrayIndex(realX-1, beforeY)].getAttribute("data-status") == game.mapStatus.WALL
            			      || $maps[game.util.getArrayIndex(realX, beforeY-1)].getAttribute("data-status") == game.mapStatus.WALL) {
            			        return false;
            			    }

            			} else if ($maps[game.util.getArrayIndex(beforeX, realY)].getAttribute("data-status") == game.mapStatus.PLAYER1
            			 	|| $maps[game.util.getArrayIndex(beforeX, realY)].getAttribute("data-status") == game.mapStatus.PLAYER2) {
            			     
            				// 상대플레이어 왼쪽에 벽이 있어야 함.
            			    if ($maps[game.util.getArrayIndex(beforeX, realY-1)].getAttribute("data-status") != game.mapStatus.WALL) {
            			        return false;
            			    }

            			    // 상대플레이어 아래,오른쪽에 벽이 없어야 함.
            			    if ($maps[game.util.getArrayIndex(beforeX, realY+1)].getAttribute("data-status") == game.mapStatus.WALL
            			        || $maps[game.util.getArrayIndex(beforeX+1, realY)].getAttribute("data-status") == game.mapStatus.WALL) {
            			        return false;
            			    }

            			} else {
            			    // 사이에 플레이어가 없으므로 점프 불가능.
            			    return false;
            			}

            		} else if ((realX - beforeX) < 0 && (realY - beforeY) < 0) {
            			// 왼쪽 위로 이동.

            			// 사이에 플레이어가 있는지 확인
            			if ($maps[game.util.getArrayIndex(realX, beforeY)].getAttribute("data-status") == game.mapStatus.PLAYER1
            				|| $maps[game.util.getArrayIndex(realX, beforeY)].getAttribute("data-status") == game.mapStatus.PLAYER2 ) {
            			     
            				// 상대플레이어 위쪽에 벽이 있어야 함.
            			    if ($maps[game.util.getArrayIndex(realX-1, beforeY)].getAttribute("data-status") != game.mapStatus.WALL) {
            			        return false;
            			    }
            			     
            			    // 상대플레이어 아래,왼쪽에 벽이 없어야 함.
            			    if ($maps[game.util.getArrayIndex(realX+1, beforeY)].getAttribute("data-status") == game.mapStatus.WALL
            			      || $maps[game.util.getArrayIndex(realX, beforeY-1)].getAttribute("data-status") == game.mapStatus.WALL) {
            			        return false;
            			    }

            			} else if ($maps[game.util.getArrayIndex(beforeX, realY)].getAttribute("data-status") == game.mapStatus.PLAYER1
            			 	|| $maps[game.util.getArrayIndex(beforeX, realY)].getAttribute("data-status") == game.mapStatus.PLAYER2) {
            			     
            				// 상대플레이어 왼쪽에 벽이 있어야 함.
            			    if ($maps[game.util.getArrayIndex(beforeX, realY-1)].getAttribute("data-status") != game.mapStatus.WALL) {
            			        return false;
            			    }

            			    // 상대플레이어 위,오른쪽에 벽이 없어야 함.
            			    if ($maps[game.util.getArrayIndex(beforeX, realY+1)].getAttribute("data-status") == game.mapStatus.WALL
            			        || $maps[game.util.getArrayIndex(beforeX-1, realY)].getAttribute("data-status") == game.mapStatus.WALL) {
            			        return false;
            			    }

            			} else {
            			    // 사이에 플레이어가 없으므로 점프 불가능.
            			    return false;
            			}

            		}

            	}
            } else {
            	// 한번에 이동할 수 있는 거리임

                // 장애물에 막혀있는지 판단
                if ($maps[middleIndex].getAttribute("data-status") != game.mapStatus.ABLE_WALL) {
                	return false;
                }
            }
            
        } else if (game.common.currentAction == game.actionStatus.CLICKWALL) {
        	// 현재 맵에 장애물 위치 판단
        	if ($maps[arrayIndex].getAttribute("data-status") != game.mapStatus.ABLE_WALL) {
        		return false;
        	}
        	
            var nextArrayIndex1 = game.util.getNextWallIndex(arrayIndex, 1);
            var nextArrayIndex2 = game.util.getNextWallIndex(arrayIndex, 2);
            
            // 연속된 위치가 장애물 설치할 수 있는지 판단
            if (nextArrayIndex1 == -1 || nextArrayIndex2 == -1) {
            	return false;
            }

            // 다음 위치가 비어있는지 판단
            if ($maps[nextArrayIndex1].getAttribute("data-status") != game.mapStatus.NONE) {
        		return false;
        	}

            // 다다음 위치가 장애물 위치인지 판단
            if ($maps[nextArrayIndex2].getAttribute("data-status") != game.mapStatus.ABLE_WALL) {
        		return false;
        	}
            
            // TODO : 길이 완전히 막히는지 판단
        }

        return true;
    };

	
})(jQuery, window, document);