package com.simple.quoridor.controller;

import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

/**
 * Swagger-UI를 이해하기 위한 예제 컨트롤러
 * @reference : SwaggerConfig.java (global settings..)
 * TODO : hyelim-jung : 아래 스웨거 사용법 익히고, 추가적으로 필요해서 사용하면 좋겠다 싶은 부분 검토.
 * TODO : hyelim-jung : 또한 SwaggerConfig.java에 설정되어있는것 처럼, 글로벌 설정 부분도 확인하고 추가적인 부분 검토.
 *
 *
 * Created by leesangpil on 2017. 2. 27..
 */
@Api(value = "ExampleController", description = "Example API")
@RestController
@RequestMapping(value = "/example")
public class ExampleController {

    @ApiOperation(value = "Example API", notes = "example api")
    /*@ApiResponses(value = {
            @ApiResponse(code = 500, message = "INTERNAL SERVER ERROR")
    })*/
    @RequestMapping(value = "/{version}/example-api", method = RequestMethod.GET, produces = "application/json")
    public ExampleApiResponse example(/*@PathVariable String version*/) {
        return new ExampleApiResponse(200, "OK");
    }

    // Example Response Model
    @Data
    @AllArgsConstructor
    class ExampleApiResponse {
        @ApiModelProperty(value = "error code", notes = "code description...", position = 0, required = true)
        private Integer errorCode;
        @ApiModelProperty(value = "error message", notes = "message description...", position = 1, required = false)
        private String errorMessage;
    }
}
