-- CreateTable
CREATE TABLE "UserLocation" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserLocation_pkey" PRIMARY KEY ("id")
);
