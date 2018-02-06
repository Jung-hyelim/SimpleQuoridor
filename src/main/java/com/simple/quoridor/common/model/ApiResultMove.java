package com.simple.quoridor.common.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import com.simple.quoridor.model.MovePlayerModel;

@Data
@AllArgsConstructor
public class ApiResultMove {
    @ApiModelProperty(notes = "api가 정상적으로 호출되었는지 여부", position = 0, required = true)
    private boolean success;
    
    @ApiModelProperty(notes = "결과 코드", position = 1, required = true)
    private Integer code;

    @ApiModelProperty(notes = "결과 메시지", position = 2, required = true)
    private String message;
	
    @ApiModelProperty(notes = "결과 상세 내용", position = 3, required = true)
    private MovePlayerModel result;
}
