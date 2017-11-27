import org.hibernate.Session;
import pbwi.HibernateUtil;
import pbwi.model.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Set;


public class main {

    public static void main(String[] args) throws ParseException {
        //test connection
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();


        Bilet biletK = new Bilet();
        Bilet biletF = new Bilet();
        Data_lotu dataLotu = new Data_lotu();//
        Firma firma = new Firma();
        FirmaLotnicza firmaLotnicza = new FirmaLotnicza();//
        Klient klient = new Klient();//
        Lot lot = new Lot();
        Lotnisko lotnisko1 = new Lotnisko();//
        Lotnisko lotnisko2 = new Lotnisko();//
        Pilot pilot = new Pilot();//
        Samolot samolot = new Samolot();//
        Trasa trasa = new Trasa();//

        klient.setImie("Kamil");
        klient.setNazwisko("Bartosiak");

        firma.setNazwa("FIRMA ");
        firma.setNIP(1234567899);

        String pattern = "dd.MM.yyyy hh:mm:ss";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        dataLotu.setWylot(simpleDateFormat.parse("27.11.2017 10:30:00"));
        dataLotu.setPrzylot(simpleDateFormat.parse("27.11.2017 11:30:00"));

        lotnisko1.setIATA("SZZ");
        lotnisko1.setMiejscowosc("Szczecin");
        lotnisko2.setIATA("WAW");
        lotnisko2.setMiejscowosc("Warszawa okęcie");

        trasa.setPoczatek(lotnisko1);
        trasa.setKoniec(lotnisko2);

        pilot.setImie("Jan");
        pilot.setNazwisko("Kowalski");

        samolot.setTyp("Pasazerski");
        samolot.setIloscMiejsc(30);

        firmaLotnicza.setNazwa("LOT");
        firmaLotnicza.setAdres("AAA");
        firmaLotnicza.setKraj("Polska");
        firmaLotnicza.setNIP(1234567890);
        firmaLotnicza.setIATA("LO");


        //powiazania
        samolot.setFirmaLotnicza(firmaLotnicza);
        Set<Samolot> samoloty = firmaLotnicza.getSamoloty();
        samoloty.add(samolot);
        firmaLotnicza.setSamoloty(samoloty);


        lot.setPilot(pilot);
        lot.setDataLotu(dataLotu);
        lot.setSamolot(samolot);
        lot.setTrasa(trasa);

        Set<Lotnisko> lotniska = firmaLotnicza.getLotniska();
        lotniska.add(lotnisko1);
        lotniska.add(lotnisko2);
        firmaLotnicza.setLotniska(lotniska);

        Set<FirmaLotnicza> firmyLotnicze1 = lotnisko1.getFirmyLotnicze();
        Set<FirmaLotnicza> firmyLotnicze2 = lotnisko2.getFirmyLotnicze();
        firmyLotnicze1.add(firmaLotnicza);
        firmyLotnicze2.add(firmaLotnicza);

        lotnisko1.setFirmyLotnicze(firmyLotnicze1);
        lotnisko2.setFirmyLotnicze(firmyLotnicze2);

        biletK.setDataLotu(dataLotu);

        biletK.setLot(lot);
        biletK.setNr_miejsca(10);
        biletK.setKlasa("Biznes");
        biletF.setDataLotu(dataLotu);
        biletF.setLot(lot);
        biletF.setNr_miejsca(1);
        biletF.setKlasa("Biznes");


        Set<Bilet> biletyKlient = klient.getBilety();
        Set<Bilet> biletyFirma = firma.getBilety();
        biletyKlient.add(biletK);
        biletyFirma.add(biletF);

        klient.setBilety(biletyKlient);
        firma.setBilety(biletyFirma);


        //session.save(pilot);
        //session.save(dataLotu);
        session.save(firma);
        //session.save(samolot);
        //session.save(firmaLotnicza);
        session.save(klient);
        //session.save(lotnisko1);
        //session.save(lotnisko2);
        //session.save(trasa);
        //session.save(lot);
        //session.save(biletK);
        //session.save(biletF);

        session.getTransaction().commit();

    }
}
