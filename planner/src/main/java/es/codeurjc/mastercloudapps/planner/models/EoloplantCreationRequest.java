package es.codeurjc.mastercloudapps.planner.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class EoloplantCreationRequest implements Serializable {

    private static final long serialVersionUID = 5511349529410950840L;

    private int id;
    private String city;

    public EoloplantCreationRequest(@JsonProperty("id") int id,
                     @JsonProperty("city") String city) {
        this.id = id;
        this.city = city;
    }

    public int getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    @Override
    public String toString() {
        return "EoloplantCreationRequest {" +
                "id=" + id +
                ", city='" + city + '}';
    }
}
