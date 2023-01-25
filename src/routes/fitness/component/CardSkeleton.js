import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Row, Col, Spin, Input, Pagination } from "antd";

export const CardSkeleton = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <p>
              <Skeleton height={200} width={250} count={1} />
            </p>
            <Skeleton count={2} /> <br /> <br />
            <Skeleton count={2} />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <p>
              <Skeleton height={200} width={250} count={1} />
            </p>
            <Skeleton count={2} /> <br /> <br />
            <Skeleton count={2} />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <p>
              <Skeleton height={200} width={250} count={1} />
            </p>
            <Skeleton count={2} /> <br /> <br />
            <Skeleton count={2} />
          </SkeletonTheme>
        </Col>
      </Row>
    </>
  );
};
export const ChallengeSkeleton = () => {
  return (
    <>
      <Row
        gutter={[16, 16]}
        style={{
          marginTop: "30px",
        }}
      >
        <Col xs={24} sm={24} md={24} lg={24}>
          <SkeletonTheme>
            <p>
              <Skeleton height={180} count={1} />
            </p>
            <Skeleton count={2} /> <br /> <br />
            <Skeleton count={2} />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16}>
          <SkeletonTheme>
            <p>
              <Skeleton height={150} count={1} />
            </p>
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <p>
              <Skeleton height={50} count={1} />
              <br />
              <Skeleton height={50} count={1} />
            </p>
          </SkeletonTheme>
        </Col>
      </Row>
    </>
  );
};
export const WellnessSkeleton = () => {
  return (
    <>
      <Row
        gutter={[16, 16]}
        style={{
          margin: "20px",
        }}
      >
        <Col xs={24} sm={24} md={24} lg={24}>
          <p>
            <Skeleton height={40} width={250} count={1} />
          </p>
          <SkeletonTheme>
            <p>
              <Skeleton height={20} width={250} count={1} />
            </p>
            <Skeleton height={10} width={250} count={5} />
          </SkeletonTheme>
        </Col>
        <br />
        <Row
          gutter={[16, 16]}
          style={{
            marginTop: "20px",
          }}
        >
          <Col xs={24} sm={24} md={24} lg={24}>
            <p>
              <Skeleton height={40} width={450} count={1} />
            </p>
            <SkeletonTheme>
              <p>
                <Skeleton height={20} width={450} count={1} />
              </p>
              <Skeleton height={10} width={450} count={5} />
            </SkeletonTheme>
          </Col>
        </Row>
      </Row>
    </>
  );
};
export const ProgramSkeleton = () => {
  return (
    <>
      <Row
        gutter={[16, 16]}
        style={{
          marginTop: "40px",
        }}
      >
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <p>
              <Skeleton height={220} width={150} count={1} />
            </p>
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16}>
          <SkeletonTheme>
            <Skeleton count={1} />
            <Skeleton height={50} count={1} /> <br />
            <br />
            <Skeleton count={2} />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <p>
              <Skeleton height={220} width={150} count={1} />
            </p>
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16}>
          <SkeletonTheme>
            <Skeleton count={1} />
            <Skeleton height={50} count={1} /> <br />
            <br />
            <Skeleton count={2} />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
      </Row>
    </>
  );
};
export const ProfileSkeleton = () => {
  return (
    <>
      <Row
        gutter={[16, 16]}
        style={{
          marginTop: "40px",
        }}
      >
        <Col xs={24} sm={24} md={12} lg={12}>
          <SkeletonTheme>
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <SkeletonTheme>
            <p
              style={{
                textAlign: "center",
                marginBottom: "50px",
              }}
            >
              <Skeleton circle={16} height={180} width={150} count={1} />
            </p>
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={100} count={1} /> <br />
          </SkeletonTheme>
        </Col>
      </Row>
    </>
  );
};
export const NautritionSkeleton = () => {
  return (
    <>
      <Row
        gutter={[16, 16]}
        style={{
          marginTop: "40px",
        }}
      >
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <SkeletonTheme>
            <Skeleton height={5} count={1} />
          </SkeletonTheme>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <Skeleton height={50} count={1} /> <br />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
      </Row>
    </>
  );
};

export const DashboardSkeleton = () => {
  return (
    <>
      <Row
        gutter={[16, 16]}
        style={{
          marginTop: "40px",
        }}
      >
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <p>
              <Skeleton height={220} width={150} count={1} />
            </p>
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16}>
          <SkeletonTheme>
            <Skeleton count={1} />
            <Skeleton height={50} count={1} /> <br />
            <br />
            <Skeleton count={2} />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <SkeletonTheme>
            <p>
              <Skeleton height={220} width={150} count={1} />
            </p>
          </SkeletonTheme>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16}>
          <SkeletonTheme>
            <Skeleton count={1} />
            <Skeleton height={50} count={1} /> <br />
            <br />
            <Skeleton count={2} />
            <Skeleton height={50} count={1} /> <br />
          </SkeletonTheme>
        </Col>
      </Row>
    </>
  );
};
