package com.simple.quoridor.model;

import io.swagger.annotations.ApiModelProperty;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstallWallModel {
	@ApiModelProperty(notes = "결과 상태 [0(설치불가능) / 1(설치가능)]", position = 0, required = true)
	private Integer resultStatus;
	
	@ApiModelProperty(notes = "설치 불가능 이유  - resultStatus 가 1인 경우 \"\" , resultStatus 가 0인 경우 설치 불가능한 이유가 들어감", position = 1, required = true)
	private String resultReason;
	
	@ApiModelProperty(notes = "맵", position = 2, required = true)
	private List<Integer> map;
	
	@ApiModelProperty(notes = "다음 차례의 player 정보 [p1 / p2]", position = 3, required = true)
	private String nextPlayer;
}
