package com.simple.quoridor.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseJson {
    @ApiModelProperty(value = "result", notes = "true or false - is possible action?", position = 0, required = true)
    private boolean result;
	
    @ApiModelProperty(value = "reason", notes = "why isPossible is flase", position = 1, required = false)
    private String reason;
}
