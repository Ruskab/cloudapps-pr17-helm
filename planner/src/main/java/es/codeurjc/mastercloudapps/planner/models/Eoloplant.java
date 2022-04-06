package es.codeurjc.mastercloudapps.planner.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class Eoloplant implements Serializable {

    private static final long serialVersionUID = 5511349529410950840L;

    private int id;
    private String city;
    private int progress = 0;
    private String planning;

    public Eoloplant(@JsonProperty("id") int id,
                     @JsonProperty("city") String city) {
        this.id = id;
        this.city = city;
        this.planning = city;
    }

    public int getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public int getProgress() {
        return progress;
    }

    public void advanceProgress() {
        this.progress += 25;
        this.progress = Math.min(this.progress, 100);
    }

    public boolean isCompleted() {
        return this.progress == 100;
    }

    public void addPlanning(String str) {
        this.planning += '-' + str;
        advanceProgress();
    }

    public String getPlanning() {
        return isCompleted()? planning : null;
    }

    public void processPlanning() {
        planning = planning.matches("^[A-Ma-m].*") ? 
            planning.toLowerCase() : 
            planning.toUpperCase();
        advanceProgress();
    }

    @Override
    public String toString() {
        return "Eoloplant{" +
                "id=" + id +
                ", city='" + city + '\'' +
                ", progress=" + progress +
                ", completed='" + isCompleted() + '\'' +
                ", planning='" + getPlanning() + '\'' +
                '}';
    }
}
