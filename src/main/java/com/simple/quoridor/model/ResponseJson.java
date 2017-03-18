package com.simple.quoridor.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseJson {
    @ApiModelProperty(value = "success", notes = "true or false - is possible action?", position = 0, required = true)
    private boolean success;
    
    @ApiModelProperty(value = "error code", notes = "code description...", position = 1, required = true)
    private Integer errorCode;

    @ApiModelProperty(value = "error message", notes = "message description...", position = 2, required = true)
    private String errorMessage;
	
    @ApiModelProperty(value = "result", notes = "", position = 3, required = true)
    private String result;
}
