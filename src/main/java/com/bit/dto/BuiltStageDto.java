package com.bit.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

import lombok.Data;

@Data
public class BuiltStageDto {
    private SongDto songInfo;
    private LocalDateTime startTime = null;
    private int voteup;
    private int votedown;
    private Map<String, String> Users = new HashMap<>();
    private List<String> QueueOrder = new ArrayList<>();
    private Map<String, SongDto> UserQueue = new HashMap<>();
    private ScheduledFuture<?> ses;

    public void cancelSES() {
        if (ses != null)
            ses.cancel(true);
    }

    public String getFirstOrderUser() {
        return QueueOrder.get(0);
    }

    private SongDto getUserSong(String nick) {
        return UserQueue.get(nick);
    }

    public int getSongLength(){
        return songInfo.getSonglength();
    }

    public SongDto setNextSong() {
        String firstOrderUser = getFirstOrderUser();
        if (firstOrderUser == null) {
            startTime = null;
            songInfo = null;
            return null;
        }

        SongDto userSong = getUserSong(firstOrderUser);

        if (userSong != null) {
            startTime = LocalDateTime.now();
            songInfo = userSong;
            songInfo.setPlayerNick(firstOrderUser);
            UserQueue.put(firstOrderUser, null);
            QueueOrder.remove(0);
            QueueOrder.add(firstOrderUser);
            return userSong;
        }
        return null;
    }
}