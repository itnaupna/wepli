package com.bit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.dto.StageDto;
import com.bit.service.StageService;

@RestController
@RequestMapping("/api/s")
public class StageController {
    @Autowired
    StageService sService;

    @PostMapping("/stage")
    public boolean postStage(StageDto sDto) {
        return sService.insertStage(sDto);
    }

    @GetMapping("/stage")
    public List<StageDto> getStage(){
        return sService.selectStageAll();
    }

    
}
