package es.codeurjc.mastercloudapps.topo.model;

public class CityDTO {

    private String id;
    private String landscape;

    public CityDTO(String id, String landscape) {
        this.id = id;
        this.landscape = landscape;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLandscape() {
        return landscape;
    }

    public void setLandscape(String landscape) {
        this.landscape = landscape;
    }
}
